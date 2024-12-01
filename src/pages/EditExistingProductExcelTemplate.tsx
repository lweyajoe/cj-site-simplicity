import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const EditExistingProductExcelTemplate = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Excel Template Product</h1>
        <ProductForm type="excel_template" mode="edit" />
      </div>
    </AdminLayout>
  );
};

export default EditExistingProductExcelTemplate;