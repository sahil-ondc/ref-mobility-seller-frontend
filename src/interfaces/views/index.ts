import { IModalData } from 'interfaces'

//For Admin Modal & Invite-admin Section
export interface IAdmin {
  email: string
  mobile: string
  name: string
}

export interface IAdminsData {
  admins: IAdmin[]
}

//For Admin Modal &  Invite-admin Section Form Values
export interface IFormValues {
  admins: {
    name: string
    mobile: string
    email: string
  }[]
}

//For All Modals
export interface IModalProps {
  showModal(value: boolean): void
}

//For assignTaskModal
export interface IAssignModalProps {
  showModal(value: boolean): void
  activeTask: string
}

//For Success Modal
export interface ISuccessModalProps {
  showModal(value: boolean): void
  modalData: IModalData
  action?: boolean
}

//For deActivateDriver
export interface IDeactiveModalProps {
  showModal(value: boolean): void
  id: string
}

//For ForgotPassword
export interface IPayloadData {
  email: string
}

//For Login section
export interface ILoginData {
  email: string
  password: string
}
//For Login section
export interface IResetPasswordData {
  password: string
  confirmPassword: string
}

//For OrderStatus Modal
export interface IImageData {
  imgSrc?: string
  title?: any
}

//For Order Tracking
export interface TaskStatus {
  status: string
  createdAt: string
}

interface TrackingDetails {
  data: {
    taskStatus: TaskStatus[]
  }
}

export interface OrderStepperProps {
  trackingDetails: TrackingDetails
}

export interface Task {
  createdAt: string
  status: string
  // Other properties for task
}

//For OrderTable
export interface OrderTableItem {
  status: string
  createdAt: string
  // Other properties for each item in the table
}

export interface OrderTableProps {
  details: OrderTableItem[]
}

//For RecordSection
export interface RecordSectionProps {
  totalAdminCount: number
  totalIssueCount: number
  totalTaskCount: number
}

//For TaskDetails
export interface ITaskDetailsData {
  orderNumber: string
  pickLocation: string
  dropLocation: string
  allocation: string
  pickDate: null | string
  dropDate: null | string
}

//For UpdateModal
export interface IUpdateStatusData {
  status: string
}

//For vehicleDetails
export interface VehicleDetailsProps {
  next: () => void
  showModal?: any
}

export interface IVehicleDetailsData {
  vehicleNumber: string
  makeYear: string
  weight: string
  brandName: string
  ownerType: string
  intercity: string
  vehicleRegistrationDocument: string
  unit: string
}
