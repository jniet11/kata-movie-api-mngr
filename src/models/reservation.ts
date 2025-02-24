export interface CreateReservationRequest {
  movie_id: number;
  room_id: number;
  show_time: Date;
  seats: any;
  email: string;
  customer_name: string;
  doc_number: string;
}

export interface UpdateReservationRequest extends CreateReservationRequest {
  id: number;
}

export interface DeleteReservationRequest {
  id: number;
}
