export type RegistrationRow = {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  correo: string;
  celular: string;
  profesion: string;
  tipo_participante: "profesional" | "tecnico";
  ciudad: string;
  institucion: string;
  voucher_url: string;
  acepta_terminos: boolean;
  estado: "pendiente" | "aprobado" | "rechazado";
  fecha_registro: string;
};

export interface Database {
  public: {
    Tables: {
      registrations: {
        Row: RegistrationRow;
        Insert: Partial<RegistrationRow> &
          Pick<
            RegistrationRow,
            | "id"
            | "nombres"
            | "apellidos"
            | "dni"
            | "correo"
            | "celular"
            | "profesion"
            | "tipo_participante"
            | "ciudad"
            | "institucion"
            | "voucher_url"
            | "acepta_terminos"
          >;
        Update: Partial<RegistrationRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
