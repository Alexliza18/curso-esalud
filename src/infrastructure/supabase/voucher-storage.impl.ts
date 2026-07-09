import "server-only";
import type { VoucherStorage } from "@/application/repositories/voucher-storage";
import { getSupabaseAdminClient } from "./admin-client";

const BUCKET = "vouchers";

export class SupabaseVoucherStorage implements VoucherStorage {
  async upload(registrationId: string, file: File): Promise<string> {
    const client = getSupabaseAdminClient();
    const extension = file.name.split(".").pop() ?? "bin";
    const path = `${registrationId}/${Date.now()}.${extension}`;

    const { error } = await client.storage.from(BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: true,
    });

    if (error) throw new Error(error.message);

    const { data } = client.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }
}
