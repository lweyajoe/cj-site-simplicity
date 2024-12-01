import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const EditExistingProductBusinessPlan = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Business Plan Product</h1>
        <ProductForm type="business_plan" mode="edit" />
      </div>
    </AdminLayout>
  );
};

export default EditExistingProductBusinessPlan;