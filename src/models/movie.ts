export interface Movie {
  id: number;
  title: string;
  gender: string;
  duration: number;
  classification: string;
}

export interface CreateMovieRequest {
  title: string;
  gender: string;
  duration: number;
  classification: string;
}

export interface UpdateMovieRequest extends CreateMovieRequest {
  id: number;
}

export interface DeleteMovieRequest {
  id: number;
}
