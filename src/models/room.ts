export interface Room {
  id: number;
  name: string;
  capacity: number;
}

export interface CreateRoomRequest {
  name: string;
  capacity: number;
}

export interface UpdateRoomRequest extends CreateRoomRequest {
  id: number;
}

export interface DeleteRoomRequest {
  id: number;
}
