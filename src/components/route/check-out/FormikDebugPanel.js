import React from "react";
import { useFormikContext } from "formik";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  Button,
} from "@mui/material";

/**
 * FormikDebugPanel Component
 * Displays real-time Formik state for debugging
 * Shows: values, errors, touched, validation state, and dirty status
 */
export const FormikDebugPanel = ({ showPanel = true }) => {
  const formik = useFormikContext();

  if (!showPanel) return null;

  const hasErrors = Object.keys(formik.errors).length > 0;
  const hasTouched = Object.keys(formik.touched).length > 0;

  const renderValue = (value) => {
    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  return (
    <Card
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 500,
        maxHeight: 600,
        overflow: "auto",
        backgroundColor: "#f5f5f5",
        border: "2px solid #ff6b6b",
        zIndex: 9999,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff6b6b" }}>
            🐛 Formik Debug Panel
          </Typography>
          <Button
            size="small"
            onClick={() => {
              console.clear();
              console.log("Form State:", formik);
            }}
          >
            Log to Console
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Form Status */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
            📊 Form Status
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={`Valid: ${formik.isValid ? "✓" : "✗"}`}
              color={formik.isValid ? "success" : "error"}
              size="small"
            />
            <Chip
              label={`Dirty: ${formik.dirty ? "✓" : "✗"}`}
              color={formik.dirty ? "warning" : "default"}
              size="small"
            />
            <Chip
              label={`Submitted: ${formik.submitCount > 0 ? "✓" : "✗"}`}
              color={formik.submitCount > 0 ? "info" : "default"}
              size="small"
            />
            <Chip
              label={`Touching: ${hasTouched ? "✓" : "✗"}`}
              color={hasTouched ? "warning" : "default"}
              size="small"
            />
          </Box>
        </Box>

        {/* Validation Errors */}
        {hasErrors && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <strong>❌ Validation Errors:</strong>
            <Box component="pre" sx={{ fontSize: "0.75rem", overflow: "auto", mt: 1 }}>
              {JSON.stringify(formik.errors, null, 2)}
            </Box>
          </Alert>
        )}

        {/* Form Values */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
            📝 Form Values
          </Typography>
          <Box
            component="pre"
            sx={{
              fontSize: "0.7rem",
              backgroundColor: "#fff",
              p: 1,
              borderRadius: 1,
              border: "1px solid #ddd",
              overflow: "auto",
              maxHeight: 200,
            }}
          >
            {JSON.stringify(formik.values, null, 2)}
          </Box>
        </Box>

        {/* Touched Fields */}
        {hasTouched && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
              👆 Touched Fields
            </Typography>
            <Box
              component="pre"
              sx={{
                fontSize: "0.7rem",
                backgroundColor: "#fff",
                p: 1,
                borderRadius: 1,
                border: "1px solid #ddd",
                overflow: "auto",
                maxHeight: 150,
              }}
            >
              {JSON.stringify(formik.touched, null, 2)}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default FormikDebugPanel;
