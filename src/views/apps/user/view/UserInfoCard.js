// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useDispatch } from 'react-redux'
import { updateProfileAction } from '../../../../redux/user/userAction'
import { useParams } from 'react-router-dom'

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'banned', label: 'Banned' }
]

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'dutch', label: 'Dutch' }
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  // ** State
  const [show, setShow] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: selectedUser?.firstName,
      lastName: selectedUser?.lastName,
      userName: selectedUser?.userName,
      email: selectedUser?.email,
      zipCode: selectedUser?.zipCode,
      address: selectedUser?.address,
      status: [{ value: selectedUser?.userStatus, label: selectedUser?.userStatus }],
      country: [{ value: selectedUser?.country, label: selectedUser?.country }],
      language: [{ value: selectedUser?.language, label: selectedUser?.language }]
    }
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser && selectedUser?.profileImage?.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser?.profileImage}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser?.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser?.firstName || "John Doe"}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  const onSubmit = data => {
    debugger
    if (Object.values(data).every(field =>
      field !== undefined || field.length > 0
    )) {
      let body = {
        id: id,
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.userName,
          email: data.email,
          zipCode: data.zipCode,
          address: data.address,
          status: data.status[0].value,
          country: data.country[0].value,
          language: data.language[0].value
        }
      }
      setShow(false)
      dispatch(updateProfileAction(body))
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      firstName: selectedUser?.firstName,
      lastName: selectedUser?.lastName,
      userName: selectedUser?.userName,
      phoneNumber: selectedUser?.phoneNumber,
      email: selectedUser?.email,
      zipCode: selectedUser?.zipCode,
      address: selectedUser?.address,
      status: [{ value: selectedUser?.userStatus, label: selectedUser?.userStatus }],
      language: [{ value: selectedUser?.language, label: selectedUser?.language }],
      country: [{ value: selectedUser?.country, label: selectedUser?.country }]
    })
  }

  const handleSuspendedClick = async () => {
    return await MySwal.fire({
      title: 'Are you sure?',
      text: "You will be able to revert user ban!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Ban user!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Banned!',
          text: 'User has been Banned.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Cancelled Ban :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  useEffect(() => {
    if (selectedUser) {
      debugger
      setValue("firstName", selectedUser?.firstName)
      setValue("lastName", selectedUser?.lastName)
      setValue("userName", selectedUser?.userName)
      setValue("email", selectedUser?.email)
      setValue("zipCode", selectedUser?.zipCode)
      setValue('address', selectedUser?.address)
      setValue("status", [{ value: selectedUser?.userStatus, label: selectedUser?.userStatus }])
      setValue("language", [{ value: selectedUser?.language, label: selectedUser?.language }])
      setValue("country", [{ value: selectedUser?.country, label: selectedUser?.country }])
    }
  }, [selectedUser])

  const handleLanguage = (value) => {
    if (!value) {
      return
    }
    if (!value.value && value.label) {
      setValue("language", [{ value: value.value, label: value.label }])
    } else {
      setValue("language", [{ value: value.value, label: value.value }])
    }
  }

  const handleCountry = (value) => {
    if (!value) {
      return
    }
    if (!value.value && value.label) {
      setValue("country", [{ value: value.value, label: value.label }])
    } else {
      setValue("country", [{ value: value.value, label: value.value }])
    }
  }

  const handleStatus = (value) => {
    if (!value) {
      return
    }
    if (!value.value && value.label) {
      setValue("status", [{ value: value.value, label: value.label }])
    } else {
      setValue("status", [{ value: value.value, label: value.value }])
    }
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser?.firstName ?? ''}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser?.documentsCreated ?? ''}</h4>
                <small>Total Document Created</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser?.videosCreated ?? ''}</h4>
                <small>Total Video Created</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Username:</span>
                  <span>{selectedUser?.userName ?? ''}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Billing Email:</span>
                  <span> {selectedUser?.email ?? ''}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser?.userStatus]}>
                    {selectedUser?.userStatus ?? ''}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selectedUser?.phoneNumber ?? ''}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Ban
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                <Controller
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='firstName'
                      name='firstName'
                      type='text'
                      placeholder='John'
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                <Controller
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      id='lastName'
                      name='lastName'
                      placeholder='Doe'
                      invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='userName'>
                  Username
                </Label>
                <Controller
                  control={control}
                  id='userName'
                  name='userName'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='userName'
                      name='userName'
                      type="text"
                      placeholder='john.doe.007'
                      invalid={errors.userName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='address'>
                  Address
                </Label>
                <Controller
                  control={control}
                  id='address'
                  name='address'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='address'
                      name='address'
                      type="text"
                      placeholder='North Finchley'
                      invalid={errors.address && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='zipCode'>
                  Zip Code
                </Label>
                <Controller
                  control={control}
                  id='zipCode'
                  name='zipCode'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='zipCode'
                      name='zipCode'
                      type="text"
                      placeholder='ABC123'
                      invalid={errors.zipCode && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='zipCode'>
                  Billing Email
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  defaultValue={selectedUser?.email ?? ''}
                  placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  Status:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  onChange={handleStatus}
                  theme={selectThemeColors}
                  defaultValue={selectedUser ? statusOptions[statusOptions?.findIndex(i => i.value === selectedUser?.userStatus)] : null}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='phoneNumber'>
                  Contact
                </Label>
                <Input id='phoneNumber' defaultValue={selectedUser ? selectedUser?.phoneNumber : null} placeholder='+1 609 933 4422' />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='language'>
                  language
                </Label>
                <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={languageOptions}
                  onChange={handleLanguage}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[languageOptions?.findIndex(i => i.value === selectedUser?.language)] ?? null}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <Select
                  id='country'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  onChange={handleCountry}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[countryOptions?.findIndex(i => i.value === selectedUser?.country)] ?? null}
                />
              </Col>
              <Col xs={12}>
                <div className='d-flex align-items-center mt-1'>
                  <div className='form-switch'>
                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    <Label className='form-check-label' htmlFor='billing-switch'>
                      <span className='switch-icon-left'>
                        <Check size={14} />
                      </span>
                      <span className='switch-icon-right'>
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className='form-check-label fw-bolder' for='billing-switch'>
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
