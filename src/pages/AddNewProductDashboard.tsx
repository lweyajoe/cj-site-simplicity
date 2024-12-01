import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const AddNewProductDashboard = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Dashboard Product</h1>
        <ProductForm type="dashboard" mode="create" />
      </div>
    </AdminLayout>
  );
};

export default AddNewProductDashboard;