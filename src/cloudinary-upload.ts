import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

/**
 * This function is used to upload files/images to cloudinary
 * @param file name of the file/image
 * @param public_id optional id given to that file by us
 * @param overwrite optional overwrite check for reupload
 * @param invalidate optional invalidate check invalidating file/image from coudinary
 * @returns returns a promise
 */
export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}

/**
 * This function is used to upload videos to cloudinary
 * @param file name of the file/image
 * @param public_id optional id given to that video by us
 * @param overwrite optional overwrite check for reupload
 * @param invalidate optional invalidate check invalidating video from coudinary
 * @returns returns a promise
 */
export function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        chunk_size: 50000,
        resource_type: 'video',
      },
      (error, result) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}
