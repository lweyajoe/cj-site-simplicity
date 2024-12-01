import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const AddNewProductSoftware = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Software Product</h1>
        <ProductForm type="software" mode="create" />
      </div>
    </AdminLayout>
  );
};

export default AddNewProductSoftware;