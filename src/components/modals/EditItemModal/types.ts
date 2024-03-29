export interface EditItemModalProps {
  id: number;
  name: string;
  tags: {
    id: number;
    name: string;
  }[];
  refetch: () => void;
}
