import useLanguage from '@/hook/useLanguage'
import useUserData from '@/hook/useUserData'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useModalDrawer from '@/hook/useModalDrawer'
import { z } from 'zod'
import useCheckFormShadcn from '@/hook/useCheckFormShadcn'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MyFormShadcn from '@/components/ShadcnUI/MyForm'
import FormInput from '@/components/ShadcnUI/FormInput'
import ButtonForm from '@/components/ButtonForm'
import FormCheckBox from '@/components/ShadcnUI/FormCheckBox'

const ModalLogin: React.FC = () => {
  const { translate } = useLanguage()
  const { login } = useUserData()
  const route = useRouter()
  const { closeModalDrawer } = useModalDrawer()
  const { checkNumberPhone, checkPassword } = useCheckFormShadcn()

  const formSchema = z.object({
    sdt: checkNumberPhone(z),
    pass: checkPassword(z),
    saveLogin: z.boolean(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sdt: '',
      pass: '',
      saveLogin: true,
    },
  })

  const [loading, setLoading] = useState(false)

  const handleRegister = () => {
    closeModalDrawer()
    route.push('/register')
  }

  const handleLogin = async (formData: any) => {
    try {
      setLoading(true)
      await login(formData.sdt, formData.pass, !!formData?.saveLogin)
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rou w-full flex flex-col gap-2 justify-start ">
      <div className="text-medium uppercase text-center w-full font-semibold">
        {translate('common.login')}
      </div>
      <MyFormShadcn form={form} onSubmit={handleLogin}>
        <FormInput
          name="sdt"
          form={form}
          placeholder={translate('userDetail.sdt')}
          label={translate('userDetail.sdt')}
        />
        <FormInput
          name="pass"
          form={form}
          label={translate('userDetail.pass')}
          placeholder={translate('userDetail.pass')}
          typeBtn="password"
        />
        <div className="pt-1 w-full" />

        <div className="flex md:justify-between md:flex-row flex-col gap-2 flex-wrap">
          <FormCheckBox
            name="saveLogin"
            form={form}
            label={translate('register.saveRegister')}
          />
          <div
            onClick={handleRegister}
            className="md:underline cursor-pointer text-blue-700"
          >
            {translate('register.title')}
          </div>
        </div>

        <div className="md:pt-2 w-full" />
        <ButtonForm
          loading={loading}
          disableClose
          titleSubmit={translate('common.login')}
        />
      </MyFormShadcn>

      {/* {formData && (
        <MyForm
          onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
          formData={formData}
          onFinish={handleLogin}
        >
          <InputForm
            key={'sdt'}
            validator={checkNumberPhone}
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
            validator={checkPassword}
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
            <MyButton loading={loading} type="submit" className="w-[150px]">
              {translate('common.ok')}
            </MyButton>
          </Form.Item>
        </MyForm>
      )} */}
    </div>
  )
}

export default ModalLogin
