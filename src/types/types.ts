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

interface BalanceModel {
  username: string;
  balance: number;
}

export { OperationModel, UserModel, RecordModel, BalanceModel };
