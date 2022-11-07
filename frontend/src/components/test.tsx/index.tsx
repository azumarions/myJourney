import React, { useState } from 'react';
 
interface IState {
  id: number;
  name: string;
  price: number;
}
 
const App: React.FC = (): JSX.Element =>  {
 
  // useState<型>(初期値)とすることで、型を指定する
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(1000);
  const [items, setItems] = useState<IState[]>([]);
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItems([...items, {id: items.length + 1, name: name, price: price}]);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        名前：<input value={name} onChange={ e => setName(e.target.value)}/>
        価格：<input value={price} onChange={ e => setPrice(parseInt(e.target.value))}/>
        <button>Add</button>
        <table>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>値段</th>
          </tr>
          {items.map((item: IState) => {
            return(
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </table>
      </form>
    </div>
  );
}
 
export default App;