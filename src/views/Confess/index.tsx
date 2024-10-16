import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import confessServices from "../../services/confess.services";

export interface IConfess {
  messages: {
    positive: string;
    negative: string;
    beforeQuestion: string;
  }
  question: string;
  buttons: {
    confirm: string;
    cancel: string;
  }
}

const Confess = () => {
  const { id } = useParams();
  const [data, setData] = useState<IConfess>();

  const getData = async (id: string) => {
    const res = await confessServices.index(id);

    if (!res.success)
      toast.error(res.message);

    setData(res.data);
  }

  useEffect(() => {
    if (id)
      getData(id)
    else
      toast.error('Ocorreu um erro ao procurar o seu pedido.');
  }, [id])

  const positive = () => toast(data?.messages?.positive);
  const negative = () => toast(data?.messages?.negative);

  return (
    <div className='confess'>
      <h1 className='confess__messages__before-question'>
        {data?.messages?.beforeQuestion}
      </h1>
      
      <p className='confess__question'>
        {data?.question}
      </p>
      
      <div className='confess__buttons'>
        <button onClick={positive} className='confess__buttons__button'>
          {data?.buttons?.confirm}
        </button>
        
        <button onClick={negative} className='confess__buttons__button'>
          {data?.buttons?.cancel}
        </button>
      </div>
    </div>
  )
};

export default Confess;