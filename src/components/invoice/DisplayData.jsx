const DisplayData = ({ status, invoiceData }) => {
  return (
    <div>
      {status && (
        <h2>
          <span style={{ fontWeight: 400 }}>Status:</span>{" "}
          {invoiceData?.status || status}
        </h2>
      )}

      {invoiceData ? (
        <div
          style={{
            border: "1px solid #C4B0FF",
            padding: "30px",
            textAlign: "left",
          }}
        >
          <p>Status: {invoiceData.status}</p>
          <p>Invoice no: {invoiceData.invoice.invoiceNumber}</p>
          <p>Total Amount: {invoiceData.invoice.totalAmount}</p>
          <hr />

          <table style={{ marginTop: "40px" }}>
            <tr>
              <th>Item</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>

            {invoiceData.invoice.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayData;
