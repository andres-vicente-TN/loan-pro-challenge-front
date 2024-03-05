import axios from "axios";
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

interface BalanceModel {
  username: string;
  balance: number;
}

export type { OperationModel, UserModel, RecordModel, BalanceModel };
export const user: Ref<String> = ref("user");
export const isLogged: Ref<boolean> = ref(false);
export const loginError: Ref<boolean> = ref(false);
export const costs: Ref<Map<string, number>> = ref(new Map());
export const token: Ref<String> = ref("");
export const balance: Ref<number> = ref(0);

export async function loadBalance() {
  try {
    await axios
      .get(import.meta.env.VITE_API_BASE_URL + "/v1/balance", {
        headers: {
          Authorization: `Basic ${token.value}`,
          "Content-Type": "application/json",
        },
      })
      .then((r) => {
        if (r.status == 200) {
          balance.value = r.data.user_balance;
        } else {
          balance.value = 0;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch {
    (e: Error) => console.log(e);
  }
}
