export interface PostDetailsDTO {
    postId: number;
    body: string;
    username: string;
    createdAt: Date;
    imageUrls: string[] | null; 
  }