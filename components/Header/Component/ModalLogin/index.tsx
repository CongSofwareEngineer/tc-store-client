import InputForm from '@/components/InputForm'
import MyForm from '@/components/MyForm'
import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import { Button, Form } from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import parsePhoneNumber from 'libphonenumber-js'

const ModalLogin: React.FC = () => {
  const { translate } = useLanguage()
  const { login } = useUserData()

  const [formData, setFormData] = useState<Record<string, string> | null>(null)
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    setFormData({
      sdt: '0392225405',
      pass: '',
    })
  }, [])

  const handleLogin = async (e: { sdt: string; pass: string }) => {
    try {
      setLoading(true)
      await login(e.sdt, e.pass)
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
            validator={checkNumber}
            required
            name="sdt"
            label={translate('userDetail.sdt')}
          />
          <InputForm
            required
            name="pass"
            label={translate('userDetail.pass')}
            isPass
          />
          <Form.Item
            style={{ marginTop: 13, display: 'flex', justifyContent: 'center' }}
          >
            <Button
              loading={loading}
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: 150 }}
            >
              {translate('common.ok')}
            </Button>
          </Form.Item>
        </MyForm>
      )}
    </div>
  )
}

export default ModalLogin
