export default function ProductTable({ products }) {
  if (products.length === 0) {
    return (
      <p data-cy="NoMatchingMessage">No products matching selected criteria</p>
    );
  }

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {products.map(product => {
          const classNameSex =
            product.user?.sex === 'm' ? 'has-text-link' : 'has-text-danger';

          return (
            <tr key={product.id} data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                {product.id}
              </td>
              <td data-cy="ProductName">{product.name}</td>
              <td data-cy="ProductCategory">
                {product.category.icon} - {product.category.title}
              </td>

              <td data-cy="ProductUser" className={classNameSex}>
                {product.user.name}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
