import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import ResourceForm from "@/components/admin/ResourceForm";
import { saveItem } from "@/lib/actions/content";
import { requireAdmin } from "@/lib/auth/session";
import { getItemWithRelations, getResource, parseId, withFieldOptions } from "@/lib/data/content";

async function loadItem(params) {
  const { resource: resourceKey, id } = await params;
  const resource = getResource(resourceKey);
  const itemId = parseId(id);
  const item = resource && itemId ? await getItemWithRelations(resource, itemId) : null;
  return { resourceKey, resource, item };
}

export async function generateMetadata({ params }) {
  const { resource, item } = await loadItem(params);
  return { title: item ? `${item[resource.config.titleField]} — tahrirlash` : undefined };
}

export default async function EditItemPage({ params }) {
  await requireAdmin();
  const { resourceKey, resource, item } = await loadItem(params);
  if (!item) notFound();

  const { config } = resource;

  return (
    <>
      <PageHeader title={item[config.titleField]} description={`${config.singular}ni tahrirlash`} backHref={`/admin/${resourceKey}`} />
      <ResourceForm
        action={saveItem.bind(null, resourceKey, item.id)}
        fields={await withFieldOptions(config.fields)}
        item={item}
        cancelHref={`/admin/${resourceKey}`}
      />
    </>
  );
}
