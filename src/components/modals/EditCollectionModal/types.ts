export interface EditCollectionModalProps {
  id: number;
  name: string;
  topic: "Books" | "Signs" | "Silverware";
  description: string;
  refetch: () => void;
}
