import InputForm from '@/components/InputForm'
import MyForm from '@/components/MyForm'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import { Checkbox, Form } from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import parsePhoneNumber from 'libphonenumber-js'
import { useRouter } from 'next/navigation'
import useModalDrawer from '@/hook/useModalDrawer'
import MyButton from '@/components/MyButton'

const ModalLogin: React.FC = () => {
  const { translate } = useLanguage()
  const { login } = useUserData()
  const route = useRouter()
  const { closeModalDrawer } = useModalDrawer()

  const [formData, setFormData] = useState<Record<
    string,
    string | boolean
  > | null>(null)
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    setFormData({
      sdt: '',
      pass: '',
      saveLogin: true,
    })
  }, [])

  const handleRegister = () => {
    closeModalDrawer()
    route.push('/register')
  }

  const handleLogin = async (e: { sdt: string; pass: string }) => {
    try {
      setLoading(true)
      await login(e.sdt, e.pass, !!formData?.saveLogin)
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }

  const checkNumber = (sdt: string): string | null => {
    const phoneNumber = parsePhoneNumber(sdt, 'VN')
    if (phoneNumber && phoneNumber.isValid()) {
      return null
    }
    return translate('warning.errorSDT')
  }

  return (
    <div className="w-full flex flex-col gap-2 justify-start ">
      <div className="text-medium uppercase text-center w-full font-semibold">
        {translate('common.login')}
      </div>
      {formData && (
        <MyForm
          onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
          formData={formData}
          onFinish={handleLogin}
        >
          <InputForm
            key={'sdt'}
            validator={checkNumber}
            required
            name="sdt"
            label={translate('userDetail.sdt')}
          />
          <InputForm
            key={'password'}
            required
            name="pass"
            label={translate('userDetail.pass')}
            isPass
          />
          <div className="flex md:flex-row justify-between w-full md:gap-0 gap-2 md:mb-0 mb-3">
            <div className="flex flex-1 gap-2  md:mt-0 mt-3 md:mb-0 mb-1 relative ">
              <div>{translate('register.saveRegister')} :</div>
              <Checkbox
                checked={!!formData?.saveLogin}
                onChange={() =>
                  setFormData({
                    ...formData,
                    saveLogin: !formData?.saveLogin,
                  })
                }
              />
            </div>
            <div className="flex-1  text-blue-500 flex justify-end items-end">
              <div
                onClick={handleRegister}
                className="md:hover:underline cursor-pointer"
              >
                {translate('register.title')}
              </div>
            </div>
          </div>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <MyButton
              loading={loading}
              size="large"
              htmlType="submit"
              className="w-[150px]"
            >
              {translate('common.ok')}
            </MyButton>
          </Form.Item>
        </MyForm>
      )}
    </div>
  )
}

export default ModalLogin
