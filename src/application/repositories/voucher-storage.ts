export interface VoucherStorage {
  upload(registrationId: string, file: File): Promise<string>;
}
