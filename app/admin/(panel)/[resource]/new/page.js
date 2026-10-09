import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import ResourceForm from "@/components/admin/ResourceForm";
import { saveItem } from "@/lib/actions/content";
import { requireAdmin } from "@/lib/auth/session";
import { getResource, withFieldOptions } from "@/lib/data/content";

export async function generateMetadata({ params }) {
  const { resource } = await params;
  const config = getResource(resource)?.config;
  return { title: config && `${config.singular} qoʻshish` };
}

export default async function NewItemPage({ params }) {
  await requireAdmin();
  const { resource: resourceKey } = await params;
  const resource = getResource(resourceKey);
  if (!resource) notFound();

  const { config } = resource;
  const defaults = Object.fromEntries(
    config.fields.filter((field) => "default" in field).map((field) => [field.name, field.default]),
  );

  return (
    <>
      <PageHeader title={`${config.singular} qoʻshish`} description={config.description} backHref={`/admin/${resourceKey}`} />
      <ResourceForm
        action={saveItem.bind(null, resourceKey, null)}
        fields={await withFieldOptions(config.fields)}
        item={defaults}
        cancelHref={`/admin/${resourceKey}`}
      />
    </>
  );
}
