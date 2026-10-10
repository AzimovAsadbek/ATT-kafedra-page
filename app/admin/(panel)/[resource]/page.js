import { Eye, EyeOff, ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActionButton from "@/components/admin/ActionButton";
import PageHeader from "@/components/admin/PageHeader";
import Alert from "@/components/ui/Alert";
import { removeItem, setPublished } from "@/lib/actions/content";
import { requireAdmin } from "@/lib/auth/session";
import { getResource, listItems } from "@/lib/data/content";

export async function generateMetadata({ params }) {
  const { resource } = await params;
  return { title: getResource(resource)?.config.title };
}

export default async function ResourceListPage({ params, searchParams }) {
  await requireAdmin();
  const [{ resource: resourceKey }, { saved }] = await Promise.all([params, searchParams]);
  const resource = getResource(resourceKey);
  if (!resource) notFound();

  const { config } = resource;
  const items = await listItems(resource);

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <Link
            href={`/admin/${resourceKey}/new`}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-5 py-2.5 font-semibold text-white hover:bg-brand-800"
          >
            <Plus className="size-5" aria-hidden="true" />
            Qoʻshish
          </Link>
        }
      />

      {saved && (
        <div className="mb-6">
          <Alert>Oʻzgarishlar saqlandi va saytda yangilandi.</Alert>
        </div>
      )}

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        {items.length === 0 ? (
          <p className="px-6 py-16 text-center text-slate-500">Hozircha yozuvlar yoʻq</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold tracking-wider text-slate-500 uppercase">
                <tr>
                  <th scope="col" className="hidden w-20 px-6 py-3 sm:table-cell">Tartib</th>
                  {config.imageField && <th scope="col" className="w-20 px-3 py-3"><span className="sr-only">Rasm</span></th>}
                  {config.columns.map((column, index) => (
                    <th key={column.name} scope="col" className={`px-3 py-3 ${index > 0 ? "hidden md:table-cell" : ""}`}>
                      {column.label}
                    </th>
                  ))}
                  <th scope="col" className="hidden px-3 py-3 sm:table-cell">Holati</th>
                  <th scope="col" className="px-6 py-3 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => {
                  const itemTitle = item[config.titleField];
                  const image = config.imageField && item[config.imageField];
                  return (
                    <tr key={item.id} className="transition hover:bg-slate-50/70">
                      <td className="hidden px-6 py-3 text-slate-400 tabular-nums sm:table-cell">{item.sortOrder}</td>
                      {config.imageField && (
                        <td className="px-3 py-3">
                          <div className="relative grid size-12 place-items-center overflow-hidden rounded-xl bg-slate-100">
                            {image ? (
                              <Image src={image} alt="" fill sizes="48px" className="object-cover" />
                            ) : (
                              <ImageIcon className="size-5 text-slate-300" aria-hidden="true" />
                            )}
                          </div>
                        </td>
                      )}
                      {config.columns.map((column, index) => (
                        <td
                          key={column.name}
                          className={`max-w-xs truncate px-3 py-3 ${
                            index === 0 ? "font-semibold text-slate-900" : "hidden text-slate-600 md:table-cell"
                          }`}
                        >
                          {item[column.name] || <span className="text-slate-300">—</span>}
                        </td>
                      ))}
                      <td className="hidden px-3 py-3 sm:table-cell">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            item.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.isPublished ? "Koʻrinadi" : "Yashirin"}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <ActionButton
                            action={setPublished.bind(null, resourceKey, item.id, !item.isPublished)}
                            label={item.isPublished ? "Saytdan yashirish" : "Saytda koʻrsatish"}
                          >
                            {item.isPublished ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </ActionButton>
                          <Link
                            href={`/admin/${resourceKey}/${item.id}`}
                            className="inline-flex items-center rounded-lg px-2.5 py-2 text-brand-700 hover:bg-brand-50"
                            aria-label={`${itemTitle} — tahrirlash`}
                            title="Tahrirlash"
                          >
                            <Pencil className="size-4" />
                          </Link>
                          <ActionButton
                            action={removeItem.bind(null, resourceKey, item.id)}
                            label="Oʻchirish"
                            variant="danger"
                            confirmMessage={`“${itemTitle}” oʻchirilsinmi? Bu amalni qaytarib boʻlmaydi.`}
                          >
                            <Trash2 className="size-4" />
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
