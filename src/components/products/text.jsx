{Array.isArray(categories) && categories.length > 0 ? (
  categories.map((category, index) => (
    <div key={index}>
      <ListItemButton onClick={() => handleToggle(category.name)}>
        <ListItemText
          primary={category.name}
          sx={{ textAlign: "center", fontSize: "14px" }}
        />
        {openCategories[category.name] ? (
          <ExpandLess />
        ) : (
          <ExpandMore />
        )}
      </ListItemButton>
      <Collapse
        in={openCategories[category.name]}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {category.subcategories?.map((sub, subIndex) => (
            <ListItemButton
              key={subIndex}
              component={Link}
              to={`/category/${category.name}?subcategory=${sub}`}
              sx={{ pl: 4, fontSize: "13px" }}
            >
              <ListItemText
                primary={sub}
                sx={{ textAlign: "center" }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider />
    </div>
  ))
) : (
  <Typography variant="h6" sx={{ textAlign: "center" }}>
    لا توجد فئات لعرضها
  </Typography>
)}