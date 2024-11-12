import {PostDetailsDTO } from "../models/PostDetailsDTO"
export interface PostResponseDTO {
    posts: PostDetailsDTO[]; 
    hasMore: boolean;         
  }