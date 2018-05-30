

// <div key={type} className="field">
//   <label htmlFor={type}>{type}</label>
//   <div className="control">
//     <div className="select">
//       <select
//         id={type}
//         name={type.toLowerCase()}
//         onChange={handleChange}
//         value={computer[type.toLowerCase()] &&
//                computer[type.toLowerCase()]._id ||
//                computer[type.toLowerCase()] || ''}
//       >
//         <option value={null} >Please select</option>
//
//         {parts.filter((part) => part.type === type).map(part =>
//           <option key={part._id} value={part._id}>
//
//             {part.ramType ? `${part.ramType}: ${part.name}, ${Decimals.calculate(part.price)}` :
//               part.size && part.chipset ? `${sizes[part.size]} ||
//             ${chipsets[part.chipset]}:  ${part.name}, ${Decimals.calculate(part.price)}` :
//                 part.size && !part.chipset ? `${sizes[part.size]}: ${part.name}, ${Decimals.calculate(part.price)}` :
//                   part.chipset ? `${chipsets[part.chipset]}: ${part.name}, ${Decimals.calculate(part.price)}` :
//                     part.storageType ? `${part.storageType}: ${part.name}, ${Decimals.calculate(part.price)}`:
//                       `${part.name}, ${Decimals.calculate(part.price)}`}
//           </option>
//         )}
//
//       </select>
//     </div>
//   </div>
//   {errors[type.toLowerCase()] && <small>{errors[type.toLowerCase()]}</small>}
// </div>
