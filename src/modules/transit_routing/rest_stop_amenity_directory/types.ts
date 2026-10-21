/**
 * BharatRide Transit Management System - Type Definitions
 * Category: transit_routing
 * Component: Highway Rest Stop and Dhaba Amenity Verification Engine (rest-stop-amenity-directory)
 * Enterprise bus transport architecture, telematics schemas, and lifecycle enums.
 */

export enum RestStopAmenityDirectoryStatus {
  INITIALIZED = 'INITIALIZED',
  ACTIVE = 'ACTIVE',
  PENDING_DISPATCH = 'PENDING_DISPATCH',
  EN_ROUTE = 'EN_ROUTE',
  HALTED_AT_STATION = 'HALTED_AT_STATION',
  OPTIMIZING_PATH = 'OPTIMIZING_PATH',
  MAINTENANCE_REQUIRED = 'MAINTENANCE_REQUIRED',
  COMPLETED = 'COMPLETED',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
}}

export enum RestStopAmenityDirectoryPriority {
  CRITICAL_EMERGENCY = 'CRITICAL_EMERGENCY',
  HIGH_PRIORITY = 'HIGH_PRIORITY',
  STANDARD_TRANSIT = 'STANDARD_TRANSIT',
  OFF_PEAK = 'OFF_PEAK',
  BACKGROUND_AUDIT = 'BACKGROUND_AUDIT',
}}

export enum RestStopAmenityDirectoryRegulatoryTier {
  MORTH_NATIONAL_STANDARD = 'MORTH_NATIONAL_STANDARD',
  AIS_140_SAFETY_COMPLIANT = 'AIS_140_SAFETY_COMPLIANT',
  STATE_STAGE_CARRIAGE = 'STATE_STAGE_CARRIAGE',
  INTERCITY_COMMERCIAL = 'INTERCITY_COMMERCIAL',
  PRIVATE_OPERATOR_CUSTOM = 'PRIVATE_OPERATOR_CUSTOM',
}}

export interface RestStopAmenityDirectoryMetadata {
  readonly recordId: string;
  readonly operatorCode: string;
  readonly fleetVehicleId: string;
  readonly routePermitNumber: string;
  readonly createdEpochMs: number;
  readonly updatedTimestamp: string;
  readonly schemaVersion: string;
  readonly correlationSignature: string;
}}

export interface RestStopAmenityDirectoryConfiguration {
  heartbeatIntervalSec: number;
  geofenceRadiusMeters: number;
  maxPermittedLagMs: number;
  dynamicSurgeMultiplier: number;
  autoRecalibrateThreshold: number;
  strictComplianceLogging: boolean;
  enableTelemetryStreaming: boolean;
  auditRetentionDays: number;
  maxRetryAttempts: number;
  cacheTtlMilliseconds: number;
}}

export interface RestStopAmenityDirectoryGeoCoordinate {
  latitude: number;
  longitude: number;
  altitudeMeters: number;
  speedKmph: number;
  headingDegrees: number;
  accuracyRadiusMeters: number;
  timestamp: number;
}}

export interface RestStopAmenityDirectoryMetricSummary {
  totalTransactions: number;
  cumulativeDistanceKm: number;
  meanProcessingLatencyMs: number;
  successRatePercentage: number;
  activeAlertCount: number;
  peakConcurrency: number;
  systemHealthScore: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_1 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_1 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_1[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_2 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_2 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_2[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_3 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_3 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_3[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_4 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_4 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_4[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_5 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_5 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_5[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_6 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_6 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_6[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_7 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_7 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_7[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_8 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_8 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_8[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_9 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_9 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_9[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_10 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_10 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_10[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_11 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_11 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_11[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_12 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_12 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_12[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_13 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_13 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_13[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_14 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_14 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_14[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_15 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_15 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_15[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_16 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_16 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_16[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_17 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_17 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_17[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_18 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_18 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_18[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_19 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_19 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_19[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface RestStopAmenityDirectoryEntityRecord_20 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'rest' | 'directory' | 'transit' | 'system';
  operationalState: RestStopAmenityDirectoryStatus;
  priorityLevel: RestStopAmenityDirectoryPriority;
  complianceTier: RestStopAmenityDirectoryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: RestStopAmenityDirectoryMetadata;
  geoStamp: RestStopAmenityDirectoryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface RestStopAmenityDirectoryBatchOperationResult_20 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: RestStopAmenityDirectoryEntityRecord_20[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}
