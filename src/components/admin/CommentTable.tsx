import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Comment {
  id: number;
  blog_post_id: number;
  author_name: string;
  author_email: string;
  content: string;
  date: string;
  approval: number;
  blog_posts?: {
    title: string;
  };
}

interface CommentTableProps {
  data: Comment[];
  onApprove: (id: number) => void;
  onDelete: (id: number) => void;
}

export const CommentTable = ({ data, onApprove, onDelete }: CommentTableProps) => {
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
        {data.map((comment) => (
          <TableRow key={comment.id}>
            <TableCell>{comment.author_name}</TableCell>
            <TableCell>{comment.author_email}</TableCell>
            <TableCell className="max-w-md truncate">{comment.content}</TableCell>
            <TableCell>{comment.blog_posts?.title}</TableCell>
            <TableCell>{new Date(comment.date).toLocaleDateString()}</TableCell>
            <TableCell>
              {comment.approval === 1 ? (
                <span className="text-green-600">Approved</span>
              ) : (
                <span className="text-yellow-600">Pending</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                {comment.approval === 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onApprove(comment.id)}
                    className="h-8 w-8 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(`/admin/edit-comment/${comment.id}`)}
                  className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(comment.id)}
                  className="h-8 w-8 bg-red-600 hover:bg-red-700 text-white"
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
