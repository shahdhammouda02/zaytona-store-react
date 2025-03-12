<Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ width: cartItems.length === 0 ? "300px" : "400px" }}
        PaperProps={{
          sx: { width: cartItems.length === 0 ? "300px" : "400px" },
        }}
      >
        <Box sx={{ width: "100%", padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            <Avatar
              alt="Profile Image"
              src="/path-to-image.jpg"
              sx={{ width: 40, height: 40 }}
            />{" "}
            {/* Replace with your image path */}
            <Typography variant="h6" gutterBottom fontWeight="bold">
              سلة التسوق
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <HighlightOffIcon sx={{ color: "black", fontSize: "35px" }} />
            </IconButton>
          </Box>

          {cartItems.length === 0 ? (
            <Typography
              sx={{
                textAlign: "right",
                fontSize: "16px",
                color: "text.secondary",
              }}
            >
              السلة فارغة
            </Typography>
          ) : (
            <div>
              <List
                sx={{
                  width: "100%",
                  alignItems: "center !important",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {cartItems.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      alignItems: "center !important",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "15px 0",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: "center !important",
                        display: "flex",
                        flexGrow: 1,
                      }}
                    >
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 80, height: 80, marginRight: 3 }}
                      />
                      <Box sx={{ textAlign: "right", marginRight: 2 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", fontSize: "14px" }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          السعر: {item.price} $
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #CECECE",
                            borderRadius: "5px",
                            padding: "2px",
                            marginTop: "5px",
                            width: "fit-content",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            sx={{
                              color: "#1e8234",
                              "&:hover": {
                                backgroundColor: "inherit !important",
                              },
                            }}
                          >
                            -
                          </IconButton>
                          <Typography
                            sx={{
                              mx: 1,
                              minWidth: "20px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            sx={{
                              color: "#1e8234",
                              "&:hover": {
                                backgroundColor: "inherit !important",
                              },
                            }}
                          >
                            +
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => removeFromCart(item.id)}
                      color="error"
                      sx={{
                        marginLeft: 2,
                        "&:hover": { backgroundColor: "inherit !important" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>

              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {" "}
                {/* Center the buttons */}
                <Box sx={{ width: "80%" }}>
                  {" "}
                  {/* Maintain 80% width for the buttons themselves */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePayment}
                    sx={{
                      backgroundColor: "#1e8234",
                      fontSize: "16px",
                      borderRadius: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    ادفع: {totalAmount.toFixed(2)} $
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteSweepIcon />}
                    onClick={removeAllItems}
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "13px",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      gap: "8px",
                      width: "100%",
                    }}
                  >
                    إزالة الكل
                  </Button>
                </Box>
              </Box>
            </div>
          )}
        </Box>
      </Drawer>