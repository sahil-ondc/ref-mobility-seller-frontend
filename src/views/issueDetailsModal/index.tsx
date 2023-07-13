import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'
import PdfImage from 'assets/images/pdf.png'
import ExcelImage from 'assets/images/excel.png'
import DownloadIcon from 'assets/svg/DownloadIcon'
import { ModalContainer, AddContentContainer, HeadingContainer, HeadingWrapper } from 'styles/views/successfulModal'
import { IModalProps } from 'interfaces/views'
import {
  IssueDetailWrapper,
  IssueWrapper,
  Title,
  OrderDesc,
  DescriptionTitle,
  IssueDesc,
  DocumentTitle,
  DocumentDesc,
  DownloadWrapper,
  Documentwrapper,
  ImageWrap,
  Download,
  DocumentLinkWrapper,
  DocumentCotainer,
  CopyLink,
} from 'styles/views/issueDetailsModal'
const IssueDetailsModal = ({ showModal }: IModalProps) => {
  return (
    <ModalContainer>
      <AddContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Issue Details</HeadingWrapper>
          <CloseIcon onClick={() => showModal(false)} />
        </HeadingContainer>
        <IssueDetailWrapper>
          <IssueWrapper>
            <Title>Order Number</Title>
            <OrderDesc>#92828212NSH3</OrderDesc>
          </IssueWrapper>
          <IssueWrapper>
            <Title>Issue Title</Title>
            <OrderDesc>Damaged and not good Product</OrderDesc>
          </IssueWrapper>
          <IssueWrapper>
            <DescriptionTitle>Issue Description</DescriptionTitle>
            <IssueDesc>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
              enim velit mollit. Exercitation veniam consequat sunt nostrud amet. elit officia consequat duis enim velit
              mollit. Exercitation veniam consequat sunt nostrud amet.elit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </IssueDesc>
          </IssueWrapper>
          <DocumentCotainer>
            <IssueWrapper>
              <DocumentTitle>Issue Document</DocumentTitle>
              <DocumentDesc>Amet minim mollit non deserunt ullamco es</DocumentDesc>
            </IssueWrapper>
            <DownloadWrapper>
              <Documentwrapper>
                <ImageWrap>
                  <img src={PdfImage} alt="PdfImage" />
                </ImageWrap>
                <ImageWrap>
                  <img src={ExcelImage} alt="ExcelImage" />
                </ImageWrap>
              </Documentwrapper>
              <Download>
                <Button label="Download" variant="outline" className="download">
                  <DownloadIcon />
                </Button>
              </Download>
            </DownloadWrapper>
          </DocumentCotainer>

          <IssueWrapper>
            <DescriptionTitle>Document Link*</DescriptionTitle>
            <DocumentLinkWrapper>
              <a href="#">https://drive.google.com/drive/folders/13roJOTZu3gor_LT_5fM...</a>
              <CopyLink>Copy Link</CopyLink>
            </DocumentLinkWrapper>
          </IssueWrapper>
        </IssueDetailWrapper>
      </AddContentContainer>
    </ModalContainer>
  )
}

export default IssueDetailsModal
