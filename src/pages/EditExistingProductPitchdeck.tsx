import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const EditExistingProductPitchdeck = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Pitchdeck Product</h1>
        <ProductForm type="pitchdeck" mode="edit" />
      </div>
    </AdminLayout>
  );
};

export default EditExistingProductPitchdeck;