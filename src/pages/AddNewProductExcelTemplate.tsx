import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const AddNewProductExcelTemplate = () => {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Excel Template Product</h1>
        <ProductForm type="excel_template" mode="create" />
      </div>
    </AdminLayout>
  );
};

export default AddNewProductExcelTemplate;