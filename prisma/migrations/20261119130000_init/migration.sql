-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PLANNING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "VendorStatus" AS ENUM ('LEAD', 'APPROVED', 'CONTRACTED', 'PREFERRED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'PAID');

-- CreateEnum
CREATE TYPE "WorkforceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ON_LEAVE');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('TENTATIVE', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "platformRole" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "activeOrganizationId" TEXT,
    "activeTeamId" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "inviterId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventType" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'PLANNING',
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3),
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "venueName" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "budget" DECIMAL(14,2),
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "dueAt" TIMESTAMP(3),
    "assigneeId" TEXT,
    "createdById" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "contactName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "status" "VendorStatus" NOT NULL DEFAULT 'LEAD',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_vendor" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "serviceDescription" TEXT,
    "quoteAmount" DECIMAL(14,2),
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'PROPOSED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" TEXT,
    "vendorId" TEXT,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "ExpenseStatus" NOT NULL DEFAULT 'DRAFT',
    "expenseDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workforce_member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT,
    "displayName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "jobTitle" TEXT,
    "department" TEXT,
    "status" "WorkforceStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workforce_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift_assignment" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "workforceMemberId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shift_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsor" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "contactName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsorship" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "sponsorId" TEXT NOT NULL,
    "packageName" TEXT,
    "amount" DECIMAL(14,2),
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'PROPOSED',
    "deliverables" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "capacity" INTEGER,
    "contactName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "venueId" TEXT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_booking" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'TENTATIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workshop" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3),
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "venueName" TEXT,
    "city" TEXT,
    "capacity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workshop_registration" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "workshopId" TEXT NOT NULL,
    "attendeeName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'REGISTERED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workshop_registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" TEXT,
    "uploadedById" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" BIGINT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "session_activeOrganizationId_idx" ON "session"("activeOrganizationId");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");

-- CreateIndex
CREATE INDEX "member_userId_idx" ON "member"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "member_organizationId_userId_key" ON "member"("organizationId", "userId");

-- CreateIndex
CREATE INDEX "invitation_organizationId_email_idx" ON "invitation"("organizationId", "email");

-- CreateIndex
CREATE INDEX "invitation_inviterId_idx" ON "invitation"("inviterId");

-- CreateIndex
CREATE INDEX "event_organizationId_status_startAt_idx" ON "event"("organizationId", "status", "startAt");

-- CreateIndex
CREATE INDEX "event_organizationId_name_idx" ON "event"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "event_id_organizationId_key" ON "event"("id", "organizationId");

-- CreateIndex
CREATE INDEX "task_organizationId_status_dueAt_idx" ON "task"("organizationId", "status", "dueAt");

-- CreateIndex
CREATE INDEX "task_organizationId_eventId_idx" ON "task"("organizationId", "eventId");

-- CreateIndex
CREATE INDEX "task_assigneeId_idx" ON "task"("assigneeId");

-- CreateIndex
CREATE INDEX "vendor_organizationId_name_idx" ON "vendor"("organizationId", "name");

-- CreateIndex
CREATE INDEX "vendor_organizationId_category_status_idx" ON "vendor"("organizationId", "category", "status");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_id_organizationId_key" ON "vendor"("id", "organizationId");

-- CreateIndex
CREATE INDEX "event_vendor_organizationId_status_idx" ON "event_vendor"("organizationId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "event_vendor_eventId_vendorId_key" ON "event_vendor"("eventId", "vendorId");

-- CreateIndex
CREATE INDEX "expense_organizationId_status_expenseDate_idx" ON "expense"("organizationId", "status", "expenseDate");

-- CreateIndex
CREATE INDEX "expense_organizationId_eventId_idx" ON "expense"("organizationId", "eventId");

-- CreateIndex
CREATE INDEX "workforce_member_organizationId_displayName_idx" ON "workforce_member"("organizationId", "displayName");

-- CreateIndex
CREATE INDEX "workforce_member_organizationId_department_status_idx" ON "workforce_member"("organizationId", "department", "status");

-- CreateIndex
CREATE UNIQUE INDEX "workforce_member_id_organizationId_key" ON "workforce_member"("id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "workforce_member_organizationId_userId_key" ON "workforce_member"("organizationId", "userId");

-- CreateIndex
CREATE INDEX "shift_assignment_organizationId_eventId_startAt_idx" ON "shift_assignment"("organizationId", "eventId", "startAt");

-- CreateIndex
CREATE INDEX "shift_assignment_organizationId_workforceMemberId_startAt_idx" ON "shift_assignment"("organizationId", "workforceMemberId", "startAt");

-- CreateIndex
CREATE INDEX "sponsor_organizationId_name_idx" ON "sponsor"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "sponsor_id_organizationId_key" ON "sponsor"("id", "organizationId");

-- CreateIndex
CREATE INDEX "sponsorship_organizationId_status_idx" ON "sponsorship"("organizationId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "sponsorship_eventId_sponsorId_key" ON "sponsorship"("eventId", "sponsorId");

-- CreateIndex
CREATE INDEX "venue_organizationId_city_name_idx" ON "venue"("organizationId", "city", "name");

-- CreateIndex
CREATE UNIQUE INDEX "venue_id_organizationId_key" ON "venue"("id", "organizationId");

-- CreateIndex
CREATE INDEX "resource_organizationId_category_status_idx" ON "resource"("organizationId", "category", "status");

-- CreateIndex
CREATE UNIQUE INDEX "resource_id_organizationId_key" ON "resource"("id", "organizationId");

-- CreateIndex
CREATE INDEX "resource_booking_organizationId_resourceId_startAt_endAt_idx" ON "resource_booking"("organizationId", "resourceId", "startAt", "endAt");

-- CreateIndex
CREATE INDEX "resource_booking_organizationId_eventId_idx" ON "resource_booking"("organizationId", "eventId");

-- CreateIndex
CREATE INDEX "workshop_organizationId_status_startAt_idx" ON "workshop"("organizationId", "status", "startAt");

-- CreateIndex
CREATE UNIQUE INDEX "workshop_id_organizationId_key" ON "workshop"("id", "organizationId");

-- CreateIndex
CREATE INDEX "workshop_registration_organizationId_workshopId_idx" ON "workshop_registration"("organizationId", "workshopId");

-- CreateIndex
CREATE INDEX "workshop_registration_email_idx" ON "workshop_registration"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workshop_registration_workshopId_email_key" ON "workshop_registration"("workshopId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "document_storageKey_key" ON "document"("storageKey");

-- CreateIndex
CREATE INDEX "document_organizationId_createdAt_idx" ON "document"("organizationId", "createdAt");

-- CreateIndex
CREATE INDEX "document_organizationId_eventId_idx" ON "document"("organizationId", "eventId");

-- CreateIndex
CREATE INDEX "audit_log_organizationId_createdAt_idx" ON "audit_log"("organizationId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_log_actorId_createdAt_idx" ON "audit_log"("actorId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_log_entityType_entityId_idx" ON "audit_log"("entityType", "entityId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_eventId_organizationId_fkey" FOREIGN KEY ("eventId", "organizationId") REFERENCES "event"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_vendor" ADD CONSTRAINT "event_vendor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_vendor" ADD CONSTRAINT "event_vendor_eventId_organizationId_fkey" FOREIGN KEY ("eventId", "organizationId") REFERENCES "event"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_vendor" ADD CONSTRAINT "event_vendor_vendorId_organizationId_fkey" FOREIGN KEY ("vendorId", "organizationId") REFERENCES "vendor"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_eventId_organizationId_fkey" FOREIGN KEY ("eventId", "organizationId") REFERENCES "event"("id", "organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_vendorId_organizationId_fkey" FOREIGN KEY ("vendorId", "organizationId") REFERENCES "vendor"("id", "organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workforce_member" ADD CONSTRAINT "workforce_member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workforce_member" ADD CONSTRAINT "workforce_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_assignment" ADD CONSTRAINT "shift_assignment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_assignment" ADD CONSTRAINT "shift_assignment_eventId_organizationId_fkey" FOREIGN KEY ("eventId", "organizationId") REFERENCES "event"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_assignment" ADD CONSTRAINT "shift_assignment_workforceMemberId_organizationId_fkey" FOREIGN KEY ("workforceMemberId", "organizationId") REFERENCES "workforce_member"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsor" ADD CONSTRAINT "sponsor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorship" ADD CONSTRAINT "sponsorship_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorship" ADD CONSTRAINT "sponsorship_eventId_organizationId_fkey" FOREIGN KEY ("eventId", "organizationId") REFERENCES "event"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorship" ADD CONSTRAINT "sponsorship_sponsorId_organizationId_fkey" FOREIGN KEY ("sponsorId", "organizationId") REFERENCES "sponsor"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue" ADD CONSTRAINT "venue_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_venueId_organizationId_fkey" FOREIGN KEY ("venueId", "organizationId") REFERENCES "venue"("id", "organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_booking" ADD CONSTRAINT "resource_booking_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_booking" ADD CONSTRAINT "resource_booking_resourceId_organizationId_fkey" FOREIGN KEY ("resourceId", "organizationId") REFERENCES "resource"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_booking" ADD CONSTRAINT "resource_booking_eventId_organizationId_fkey" FOREIGN KEY ("eventId", "organizationId") REFERENCES "event"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workshop" ADD CONSTRAINT "workshop_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workshop" ADD CONSTRAINT "workshop_eventId_organizationId_fkey" FOREIGN KEY ("eventId", "organizationId") REFERENCES "event"("id", "organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workshop_registration" ADD CONSTRAINT "workshop_registration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workshop_registration" ADD CONSTRAINT "workshop_registration_workshopId_organizationId_fkey" FOREIGN KEY ("workshopId", "organizationId") REFERENCES "workshop"("id", "organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_eventId_organizationId_fkey" FOREIGN KEY ("eventId", "organizationId") REFERENCES "event"("id", "organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
