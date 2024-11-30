import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Reply {
  id: number;
  comment_id: number;
  author_name: string;
  author_email: string;
  content: string;
  date: string;
  approval: number;
  comments?: {
    blog_posts?: {
      title: string;
    };
  };
}

interface ReplyTableProps {
  data: Reply[];
  onApprove: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ReplyTable = ({ data, onApprove, onDelete }: ReplyTableProps) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Author</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Blog Post</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((reply) => (
          <TableRow key={reply.id}>
            <TableCell>{reply.author_name}</TableCell>
            <TableCell>{reply.author_email}</TableCell>
            <TableCell className="max-w-md truncate">{reply.content}</TableCell>
            <TableCell>{reply.comments?.blog_posts?.title}</TableCell>
            <TableCell>{new Date(reply.date).toLocaleDateString()}</TableCell>
            <TableCell>
              {reply.approval === 1 ? (
                <span className="text-green-600">Approved</span>
              ) : (
                <span className="text-yellow-600">Pending</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                {reply.approval === 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onApprove(reply.id)}
                    className="h-8 w-8 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(`/admin/edit-reply/${reply.id}`)}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(reply.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
