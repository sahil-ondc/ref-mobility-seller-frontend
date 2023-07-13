import { IModalData } from 'interfaces'
import Camera from 'assets/svg/Camera'

export const dragData: {
  documentUpload: IModalData
  photoUpload: IModalData
} = {
  documentUpload: {
    icon: null,
    heading: 'Drop files to attach or',
    span: 'Browse',
    detail:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  },
  photoUpload: {
    icon: <Camera />,
    heading: '',
    span: 'Browse  Gallery',
    detail: 'Click photo or upload from gallery',
  },
}
