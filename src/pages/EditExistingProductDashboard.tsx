import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const EditExistingProductDashboard = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Dashboard Product</h1>
        <ProductForm type="dashboard" mode="edit" />
      </div>
    </AdminLayout>
  );
};

export default EditExistingProductDashboard;