import {
  MainWrapper,
  Wrapper,
  Heading,
  DetailWrapper,
  DetailContainer,
  Title,
  AddressTitle,
  Content,
  AddressContent,
} from 'styles/views/adminDashboard/tableDescription'

const ItemDetails = ({ record }: any) => {
  const { name, building, city, state } = record?.fulfillments[0]?.start?.location?.address
  const { phone } = record?.fulfillments[0]?.start?.contact

  return (
    <MainWrapper>
      <Wrapper>
        <Heading>Item Details</Heading>
        <DetailWrapper>
          <DetailContainer>
            <Title>Item Name</Title>
          </DetailContainer>
          <DetailContainer>
            <AddressTitle>Pickup Location</AddressTitle>
          </DetailContainer>
          <DetailContainer>
            <Title>Contact</Title>
          </DetailContainer>
        </DetailWrapper>

        {record?.linked_order?.items.map((item: any) => {
          // const { phone } = item.start?.contact

          return (
            <DetailWrapper key={item?.descriptor?.name}>
              <DetailContainer>
                <Content>{item?.descriptor?.name}</Content>
              </DetailContainer>
              <DetailContainer>
                <AddressContent>
                  {name}, {building}, {city}, {state}
                </AddressContent>
              </DetailContainer>
              <DetailContainer>{<Content>{phone}</Content>}</DetailContainer>
            </DetailWrapper>
          )
        })}
      </Wrapper>
    </MainWrapper>
  )
}

export default ItemDetails
