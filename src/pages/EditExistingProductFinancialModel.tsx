import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const EditExistingProductFinancialModel = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Financial Model Product</h1>
        <ProductForm type="financial_model" mode="edit" />
      </div>
    </AdminLayout>
  );
};

export default EditExistingProductFinancialModel;