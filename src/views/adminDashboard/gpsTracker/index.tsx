import {
  MainWrapper,
  DeliveryDetailWrapper,
  DetailWrapper,
  WrapperTitle,
  WrapperDetail,
  DriverDetailWrapper,
  Heading,
  DetailContainer,
  DataWrapper,
  Title,
  Detail,
  OrderDetailWrapper,
  StatusWrapper,
} from 'styles/views/adminDashboard/gpsTracker'

const OrderDetail = () => (
  <MainWrapper>
    <DeliveryDetailWrapper>
      <DetailWrapper>
        <WrapperTitle>Delivery serial number</WrapperTitle>
        <WrapperDetail>#827272UWG28</WrapperDetail>
      </DetailWrapper>
    </DeliveryDetailWrapper>
    <DriverDetailWrapper>
      <Heading>Driver&apos;s Detail</Heading>
      <DetailContainer>
        <DataWrapper>
          <Title>Name</Title>
          <Detail>David John</Detail>
        </DataWrapper>
        <DataWrapper>
          <Title>Location</Title>
          <Detail>Los angeles, CA</Detail>
        </DataWrapper>
        <DataWrapper>
          <Title>Email</Title>
          <Detail>david.john@gmail.com</Detail>
        </DataWrapper>
        <DataWrapper>
          <Title>Registered vehicle</Title>
          <Detail>HR - 26 - RH 2347</Detail>
        </DataWrapper>
        <DataWrapper>
          <Title>Contact</Title>
          <Detail>+91 827 9382 938</Detail>
        </DataWrapper>
      </DetailContainer>
    </DriverDetailWrapper>
    <OrderDetailWrapper>
      <Heading>Order Detail</Heading>
      <DataWrapper>
        <Title>Order ID</Title>
        <Detail>827272WSW8</Detail>
      </DataWrapper>
      <DetailContainer>
        <DataWrapper>
          <Title>Time of Order</Title>
          <Detail>28/09/23 (6:55Am)</Detail>
        </DataWrapper>
        <DataWrapper>
          <Title>Time of Delivery</Title>
          <Detail>31/09/23 (10:30pm)</Detail>
        </DataWrapper>
      </DetailContainer>
      <DataWrapper>
        <Title>Status</Title>
        <StatusWrapper>Order-picked-up</StatusWrapper>
      </DataWrapper>
    </OrderDetailWrapper>
  </MainWrapper>
)

export default OrderDetail
