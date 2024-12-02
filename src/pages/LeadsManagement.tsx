import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/supabaseClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { LeadsTable } from "@/components/admin/LeadsTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LeadsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_us")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    
    if (confirmDelete) {
      const { error } = await supabase
        .from("contact_us")
        .delete()
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete message",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Message deleted successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Leads Management</h1>
        
        <div className="glass-card p-6">
          <LeadsTable 
            data={leads}
            onView={(message) => setSelectedMessage(message)}
            onDelete={handleDelete}
          />
        </div>

        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message Content</DialogTitle>
            </DialogHeader>
            <div className="mt-4 whitespace-pre-wrap">{selectedMessage}</div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default LeadsManagement;