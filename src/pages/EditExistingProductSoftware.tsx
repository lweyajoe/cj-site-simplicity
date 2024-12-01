import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const EditExistingProductSoftware = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Software Product</h1>
        <ProductForm type="software" mode="edit" />
      </div>
    </AdminLayout>
  );
};

export default EditExistingProductSoftware;