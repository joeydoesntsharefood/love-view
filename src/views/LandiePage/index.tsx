import { useState } from "react";
import Input from "../../components/Input";
import { keys } from "./constants";
import { IConfess } from "../Confess";
import confessServices from "../../services/confess.services";
import { toast } from "react-toastify";
import { useI18n } from "../../contexts/i18n-context";
import Button from "../../components/Button";
import { isValid } from "../../utils/isValid";

const example = `${import.meta.env.VITE_MY_URL}/confess/670feaaa442e4faf0e3e26e5`

const LandiePage = () => {
  const { t } = useI18n();

  const [data, setData] = useState<any>();
  const [link, setLink] = useState<string | null>();

  const handleData = (value: any) =>
    setData((prev: any) => ({ ...prev, ...value }));

  const onSubmit = async () => {
    const { errors, valid } = isValid.registerData(data);

    if (!valid) {
      errors.forEach((value) => toast.error(t(value)));
      return null;
    }

    const registerData: IConfess & { email: string } = {
      email: data.email,
      messages: {
        positive: data.positive,
        negative: data.negative,
        beforeQuestion: data.beforeQuestion
      },
      question: data.question,
      buttons: {
        confirm: data.confirm,
        cancel: data.cancel,
      }
    };

    const res = await confessServices.create(registerData);

    if (!res.success) {
      toast.error(res.message);
      return null;
    }

    toast.success(res.message);
    setLink(`${import.meta.env.VITE_MY_URL}/confess/${res.data.id}`);
  }

  const clear = () => {
    setData(null);
    setLink(null);
  }

  const goToLink = () => {
    if (!link) {
      window.open(example);
      return null;
    }

    navigator.clipboard.writeText(link).then(() => {
      toast.success(t('alert.copy.success'));
    }).catch(() => {
      toast.error(t('alert.copy.error'));
    });
  }

  return (
    <div className='landie-page'>
      <div className='landie-page__texts'>
        <h1 className='landie-page__texts__title'>
          {t('views.lp.title')}
        </h1>

        <p className='landie-page__texts__text'>
          {t('views.lp.text.title')}
        </p>

        <p className='landie-page__texts__text'>
          {t('views.lp.text.intro')}
        </p>

        <p className='landie-page__texts__text'>
          {t('views.lp.text.shared')}
        </p>

        <p className='landie-page__texts__text'>
          {t('views.lp.text.copy')}
        </p>

        <p className='landie-page__texts__text'>
          {t('views.lp.text.wpp')}
        </p>

        <p className='landie-page__texts__text'>
          {t('views.lp.text.finish')}
        </p>
        

        <div className='landie-page__texts__link'>
          <p className='landie-page__texts__text'>
            {t(!link ? 'views.lp.example' : 'views.lp.link')}
          </p>
          
          <Button onClick={goToLink}>
            {t(link ? 'views.lp.access' : 'views.lp.toExample')}
          </Button>
        </div>
      </div>

      <div className='landie-page__container-inputs'>
        {
          keys.map(({ key, placeholder, label }, i) => 
            <Input
              key={`${i}-inputs`}
              value={data}
              onChange={handleData}
              name={key}
              placeholder={t(placeholder)}
              type='text'
              label={t(label)}
            />
          )
        }

        <Button onClick={onSubmit}>
          {t('views.lp.confirm')}
        </Button>

        <Button onClick={clear}>
          {t('views.lp.cancel')}
        </Button>
      </div>
    </div>
  )
}

export default LandiePage;