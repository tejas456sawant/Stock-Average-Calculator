import { useState } from "react";
import "./App.css";

const App = () => {
  const [totalBuy, setTotalBuy] = useState([
    {
      sr_no: 0,
      units: 0,
      price: 0,
    },
  ]);

  const [result1, setResult1] = useState();
  const [result2, setResult2] = useState();
  const [average, setAverage] = useState();

  const addBuy = () => {
    setTotalBuy((oldTotalBuy) => [
      ...oldTotalBuy,
      {
        sr_no: oldTotalBuy[oldTotalBuy.length - 1].sr_no + 1,
        units: 0,
        price: 0,
      },
    ]);
  };

  const removeBuy = (i) => {
    const values = [...totalBuy];
    values.splice(i, 1);
    setTotalBuy(values);
  };

  const addUnit = (i, event) => {
    const values = [...totalBuy];
    values[i].units = parseFloat(event.target.value);
    setTotalBuy(values);
  };

  const addPrice = (i, event) => {
    const values = [...totalBuy];
    values[i].price = parseFloat(event.target.value);
    setTotalBuy(values);
  };

  const calculateAverage = () => {
    let sum1 = 0;
    let sum2 = 0;
    let average = 0;

    for (let i = 0; i < totalBuy.length; i++) {
      sum1 += totalBuy[i].units * totalBuy[i].price;
    }
    for (let i = 0; i < totalBuy.length; i++) {
      sum2 += totalBuy[i].units;
    }
    average = sum1 / sum2;

    setResult1(sum1);
    setResult2(sum2);
    setAverage(average);
  };

  return (
    <section className='container font-monospace'>
      <h4 className='text-center mt-5 text-primary'>
        Stock Market Average Calculator
      </h4>

      <div className='mt-4'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Buy Sr.No</th>
              <th scope='col'>Units</th>
              <th scope='col'>Price</th>
              <th scope='col'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {totalBuy.map((buy) => (
              <tr key={buy.sr_no}>
                <th>{buy.sr_no}</th>
                <td>
                  <input
                    type='number'
                    value={buy.units}
                    onChange={(event) => addUnit(buy.sr_no, event)}
                  />
                </td>
                <td>
                  <input
                    type='number'
                    value={buy.price}
                    onChange={(event) => addPrice(buy.sr_no, event)}
                  />
                </td>
                {buy.sr_no !== 0 ? (
                  <td>
                    <button
                      type='button'
                      className='btn btn-outline-danger'
                      onClick={() => removeBuy(buy.sr_no)}>
                      <i className='bi bi-trash-fill'></i> Remove
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type='button'
                      className='btn btn-outline-danger'
                      disabled>
                      <i className='bi bi-trash-fill'></i> Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className='text-end mt-2'>
          <div className='btn-group shadow' role='group'>
            <button
              type='button'
              className='btn btn-outline-warning'
              onClick={addBuy}>
              <i className='bi bi-plus-circle-fill'></i> Add
            </button>
            <button
              type='button'
              className='btn btn-outline-info'
              onClick={calculateAverage}>
              Calculate
            </button>
          </div>
        </div>

        {average && (
          <div className='text-start mt-2'>
            <pre className='h5'>
              Average Price : <span className='text-success'>{average}</span>
            </pre>
            <pre className='h5'>
              Total Units : <span className='text-success'>{result2}</span>
            </pre>
            <pre className='h5'>
              Total Amount : <span className='text-success'>{result1}</span>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
