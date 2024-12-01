import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const EditProduct = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
        <ProductForm mode="edit" />
      </div>
    </AdminLayout>
  );
};

export default EditProduct;