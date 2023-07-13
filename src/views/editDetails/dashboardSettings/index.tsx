import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import APIS from 'constants/api'
import { AppContext } from 'context/payloadContext'
import usePost from 'hooks/usePost'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import SelectField from 'components/SelectField'
import { PRICE_CALCULATION_SCHEMA } from 'validations/priceCalculationValidation'
import {
  MainWrapper,
  HeadingWrapper,
  MainHeading,
  SubHeading,
  FormWrapper,
  SettingsWrapper,
  DetailsWrapper,
  InputWrapper,
} from 'styles/views/editDetails'
import { ErrorMessage, Label } from 'styles/views/signin'
import { EditButtonWrapper } from 'styles/views/dashboard'

const DashboardSettings = () => {
  const { userInfo } = useContext(AppContext)
  const { mutateAsync } = usePost()
  const distanceOptions = [{ value: 'km', label: 'per kilometer' }]

  const weightOptions = [
    { value: 'volumetric_weight', label: 'volumetric weight' },
    { value: 'dead_weight', label: 'dead weight' },
  ]

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(PRICE_CALCULATION_SCHEMA),
    defaultValues: {
      distance: '',
      kilometrePrice: '',
      weight: '',
      kilogramPrice: '',
    },
  })

  useEffect(() => {
    setValue('distance', userInfo?.settings?.pricePerDistance?.unit)
    setValue('kilometrePrice', userInfo?.settings?.pricePerDistance?.value)
    setValue('weight', userInfo?.settings?.pricePerWeight?.type)
    setValue('kilogramPrice', userInfo?.settings?.pricePerWeight?.value)
  }, [userInfo])

  const submitData = async (data: any) => {
    const payload = {
      pricePerDistance: {
        unit: data?.distance,
        value: Number(data?.kilometrePrice),
      },
      pricePerWeight: {
        unit: 'kilogram',
        value: Number(data?.kilogramPrice),
        type: data?.weight,
      },
    }

    try {
      await mutateAsync({
        url: APIS.PRICE_CALCULATION,
        payload: payload,
      })
    } catch (err) {
      err
    }
  }

  return (
    <MainWrapper>
      <HeadingWrapper>
        <MainHeading>Price Calculations</MainHeading>
        <SubHeading>Amet minim mollit non deserunt ullamco est quat sunt nostrud amet.</SubHeading>
      </HeadingWrapper>
      <FormWrapper onSubmit={handleSubmit(submitData)}>
        <SettingsWrapper>
          <DetailsWrapper>
            <InputWrapper error={errors.distance}>
              <Label>Price calculation</Label>
              <SelectField
                placeholder="Enter Distance"
                control={control}
                name="distance"
                options={distanceOptions}
                error={errors.distance}
              />
              <ErrorMessage>{errors?.distance?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors.kilometrePrice}>
              <Label>Per kilometer price*</Label>
              <TextInput
                type="number"
                placeholder="Enter Price"
                control={control}
                name="kilometrePrice"
                error={errors.kilometrePrice}
                maxLength={2}
                className="price"
              />
              <ErrorMessage>{errors?.kilometrePrice?.message}</ErrorMessage>
            </InputWrapper>
          </DetailsWrapper>
          <DetailsWrapper>
            <InputWrapper error={errors.weight}>
              <Label>Price calculation per kilograms*</Label>
              <SelectField
                placeholder="Enter Weight"
                control={control}
                name="weight"
                options={weightOptions}
                error={errors.weight}
              />
              <ErrorMessage>{errors?.weight?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors.kilogramPrice}>
              <Label>Per gram price*</Label>
              <TextInput
                type="number"
                placeholder="Enter Price"
                control={control}
                name="kilogramPrice"
                error={errors.kilogramPrice}
                maxLength={2}
                className="price"
              />
              <ErrorMessage>{errors?.kilogramPrice?.message}</ErrorMessage>
            </InputWrapper>
          </DetailsWrapper>
        </SettingsWrapper>
        <EditButtonWrapper>
          <Button label="Cancel" type="button" variant="contained" className="cancel" />
          <Button label="Save" type="submit" variant="contained" />
        </EditButtonWrapper>
      </FormWrapper>
    </MainWrapper>
  )
}

export default DashboardSettings
