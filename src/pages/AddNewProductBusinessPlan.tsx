import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const AddNewProductBusinessPlan = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Business Plan Product</h1>
        <ProductForm type="business_plan" mode="create" />
      </div>
    </AdminLayout>
  );
};

export default AddNewProductBusinessPlan;