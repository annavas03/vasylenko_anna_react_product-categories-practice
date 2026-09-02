export default function FilterNavigation({
  users,
  categories,
  selectedOwner,
  onOwnerChange,
  searchQuery,
  onSearchQueryChange,
  selectedCategories,
  onCategoryChange,
}) {
  const isInputEmpty = searchQuery === '';

  const handleResetFilters = () => {
    onOwnerChange(0);
    onSearchQueryChange('');
    onCategoryChange([]);
  };

  const handleCategory = categoryId => {
    onCategoryChange(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId],
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={selectedOwner === 0 ? 'is-active' : ''}
          onClick={e => {
            e.preventDefault();
            onOwnerChange(0);
          }}
        >
          All
        </a>

        {users.map(user => (
          <a
            data-cy="FilterUser"
            href="#/"
            key={user.id}
            className={selectedOwner === user.id ? 'is-active' : ''}
            onClick={event => {
              event.preventDefault();
              onOwnerChange(user.id);
            }}
          >
            {user.name}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            data-cy="SearchField"
            type="text"
            className="input"
            placeholder="Search"
            value={searchQuery}
            onChange={event => {
              onSearchQueryChange(event.target.value);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {!isInputEmpty && (
            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => onSearchQueryChange('')}
              />
            </span>
          )}
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          className={`button is-success mr-6 ${
            selectedCategories.length > 0 ? 'is-outlined' : ''
          }`}
          onClick={event => {
            event.preventDefault();
            onCategoryChange([]);
          }}
        >
          All
        </a>

        {categories.map(category => {
          const isSelected = selectedCategories.includes(category.id);

          return (
            <a
              data-cy="Category"
              className={`button mr-2 my-1 ${isSelected ? 'is-info' : ''}`}
              href="#/"
              key={category.id}
              onClick={event => {
                event.preventDefault();
                handleCategory(category.id);
              }}
            >
              {category.title}
            </a>
          );
        })}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={event => {
            event.preventDefault();
            handleResetFilters();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
}
