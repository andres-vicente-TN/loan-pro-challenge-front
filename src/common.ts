import { ref, type Ref } from "vue";

interface OperationModel {
  id: number;
  type: string;
  cost: number;
  created_at: Date;
}

interface UserModel {
  id: number;
  username: string;
  password: string;
  status: string;
  created_at: Date;
}

interface RecordModel {
  id: number;
  description: string;
  operation_response: string;
  user_balance: number;
}

export type { OperationModel, UserModel, RecordModel };
export const user: Ref<String> = ref("user");
export const isLogged: Ref<boolean> = ref(false);
